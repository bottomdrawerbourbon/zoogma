package Admin::Controller::Shows;
use Moose;
use namespace::autoclean;
use DateTime::Format::Strptime;

BEGIN {extends 'Catalyst::Controller'; }

=head1 NAME

Site::Controller::Band - Catalyst Controller

=head1 DESCRIPTION

Catalyst Controller.

=head1 METHODS

=cut


=head2 index

=cut

sub default :Path :Args(0) {
    my ( $self, $c ) = @_;
    $c->stash->{current_view} = 'TT';
    $c->stash->{template} = 'shows/default.tt';
    my $showsRs = $c->model('MyModel::TourDate')->search({}, { order_by => { -asc => 'date'} });
    @{$c->stash->{shows}} = $showsRs->all;
    #$c->forward( $c->view('Shows') );
}

sub edit :Local : Args(1) {
    my ($self, $c, $id) = @_;

    my $show = $c->model('MyModel::TourDate')->find({ id => $id });
    if( !$show ) {
        $c->stash->{error} = "Unable to find specified show";
        $c->detach('/shows/default');
    }
    $c->stash->{show} = $show;

    # If the page was submitted to
    if( $c->req->params->{form_submit} ) {
        $c->log->info("Updating $id");
        foreach my $param( qw(city venue description facebook_event_url tickets_url additional_band ticket_dos_price ticket_adv_price) ) {
            $show->$param( $c->req->params->{$param} );
        }
        if( $c->req->params->{date} ) {
            my $strp = DateTime::Format::Strptime->new( pattern   => '%F %T' );
            my $date = $strp->parse_datetime( $c->req->params->{date} );
            if( $date ) {
                $show->date($date);
            }
        }

        $show->update;
        $c->stash->{message} = "Event updated";
        $c->detach('/shows/default');
    }
    $c->stash->{current_view} = 'TT';
}

sub delete :Local : Args(1) {
    my ($self, $c, $id) = @_;
    $c->stash->{current_view} = 'TT';

    my $show = $c->model('MyModel::TourDate')->find({ id => $id });
    if( !$show ) {
        $c->stash->{error} = "Unable to find specified show";
        $c->detach('/shows/default');
    }
    $show->delete;
    $c->stash->{message} = "Event Deleted";

    $c->detach('/shows/default');
}


=head1 AUTHOR

Nicholas McCamey,,,

=head1 LICENSE

This library is free software. You can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

__PACKAGE__->meta->make_immutable;

1;
